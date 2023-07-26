import { LitElement, unsafeCSS } from 'lit';

// import twStyle from '../assets/tailwind.global.css?inline';
import twStyle from '../assets/tailwind.global.css';

const tailwindElement = unsafeCSS(twStyle);

export const TailwindElement = (style?: unknown) =>
	class extends LitElement {
		static styles = style ? [tailwindElement, unsafeCSS(style)] : [tailwindElement];
	};