import { App } from '@renderer/app';
import { appIconHref } from '@renderer/constants';
import { render } from 'preact';
import './styles.css';

const installRendererIcon = () => {
  const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (icon) icon.href = appIconHref;
};

installRendererIcon();

const root = document.getElementById('root') as HTMLElement;

render(<App />, root);
