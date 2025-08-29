import maplibregl from "maplibre-gl";

export class CustomControl implements maplibregl.IControl {
  private container!: HTMLElement;

  onAdd(map: maplibregl.Map): HTMLElement {
    this.container = document.createElement('div');
    this.container.className = 'custom-control';
    this.container.innerHTML = `<button>Custom Control</button>`;
    this.container.style.margin = '10px';
    this.container.style.padding = '5px';
    this.container.style.backgroundColor = '#fff';
    this.container.style.border = '1px solid #ccc';
    this.container.style.borderRadius = '4px';
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
  // getDefaultPosition?: (() => maplibregl.ControlPosition) | undefined;
}
