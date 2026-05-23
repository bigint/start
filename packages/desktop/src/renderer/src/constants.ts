export const isDevelopment = import.meta.env.DEV;

export const appIconHref = isDevelopment ? '/icon-dev.png' : '/icon.png';
