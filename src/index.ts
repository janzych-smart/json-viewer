import { JsonViewer } from './JsonViewer';

window.customElements.define('json-viewer', JsonViewer);

declare global {
    interface HTMLElementTagNameMap {
        'json-viewer': JsonViewer;
    }
}
