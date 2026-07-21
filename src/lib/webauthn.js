// Llaves de acceso (passkeys): puente entre el API y navigator.credentials.
// El servidor habla base64url; el navegador quiere ArrayBuffers. Aquí se
// traduce en ambos sentidos y no en cada pantalla.
import api from '@/lib/api';

const toBuffer = (b64u) =>
  Uint8Array.from(atob(b64u.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0)).buffer;

const toB64u = (buf) =>
  btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

export const passkeysSupported = () =>
  typeof window !== 'undefined' && !!window.PublicKeyCredential;

// Alta de una llave nueva (requiere sesión). Devuelve la lista actualizada.
export const registerPasskey = async (name) => {
  const { data } = await api.post('/me/passkeys/options');
  const options = data.options;
  options.challenge = toBuffer(options.challenge);
  options.user.id = toBuffer(options.user.id);
  (options.excludeCredentials || []).forEach((c) => { c.id = toBuffer(c.id); });
  const cred = await navigator.credentials.create({ publicKey: options });
  const res = await api.post('/me/passkeys/verify', {
    challenge_id: data.challenge_id,
    name,
    credential: {
      id: cred.id,
      rawId: toB64u(cred.rawId),
      type: cred.type,
      authenticatorAttachment: cred.authenticatorAttachment || undefined,
      clientExtensionResults: cred.getClientExtensionResults(),
      response: {
        clientDataJSON: toB64u(cred.response.clientDataJSON),
        attestationObject: toB64u(cred.response.attestationObject),
      },
    },
  });
  return res.data;
};

// Entrar con llave, sin escribir correo. Devuelve {token, user}.
export const loginWithPasskey = async () => {
  const { data } = await api.post('/auth/passkey/options');
  const options = data.options;
  options.challenge = toBuffer(options.challenge);
  (options.allowCredentials || []).forEach((c) => { c.id = toBuffer(c.id); });
  const cred = await navigator.credentials.get({ publicKey: options });
  const res = await api.post('/auth/passkey/verify', {
    challenge_id: data.challenge_id,
    credential: {
      id: cred.id,
      rawId: toB64u(cred.rawId),
      type: cred.type,
      clientExtensionResults: cred.getClientExtensionResults(),
      response: {
        clientDataJSON: toB64u(cred.response.clientDataJSON),
        authenticatorData: toB64u(cred.response.authenticatorData),
        signature: toB64u(cred.response.signature),
        userHandle: cred.response.userHandle ? toB64u(cred.response.userHandle) : null,
      },
    },
  });
  return res.data;
};
