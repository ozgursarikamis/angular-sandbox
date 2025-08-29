import maplibregl from "maplibre-gl";

export class CustomControl implements maplibregl.IControl {
  private container!: HTMLElement;

  onAdd(map: maplibregl.Map): HTMLElement {
    this.container = document.createElement('div');
    this.container.className = 'maplibregl-ctrl maplibregl-ctrl-group';

    const button = document.createElement('button');
    button.className = 'custom-control';
    button.innerHTML = 'CC';
    button.type = 'button';
    button.style.cursor = 'pointer';
    this.container.appendChild(button);

    this.container.style.cursor = 'pointer';
    this.container.style.pointerEvents = 'auto'; // Ensure the button is clickable

    this.container.addEventListener('click', () => {
      console.log('Custom control clicked!');
    });

    return this.container;
  }
  onRemove(map: maplibregl.Map): void {
    if (this.container) {
      this.container.parentNode?.removeChild(this.container);
    }
  }
  getDefaultPosition?: (() => maplibregl.ControlPosition) | undefined;
}
