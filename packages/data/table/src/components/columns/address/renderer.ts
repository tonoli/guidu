function AddressCellRenderer() {}

AddressCellRenderer.prototype.init = function(params) {
  // create the cell
  this.eGui = document.createElement('div');
  this.eGui.style = 'min-width: 0;';
  this.eGui.innerHTML = `
    <span class="d-flex align-items-center justify-content-between">
      <span class="flex-grow-1 text-truncate">${params.value || '-'}</span>
      ${
        params.value
          ? `
            <a href="tel:${params.value}" target="_blank" class="btn p-1 ml-3 d-flex" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone-call"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </a>
          `
          : ''
      }
    </span>
  `;
};

// gets called once when grid ready to insert the element
AddressCellRenderer.prototype.getGui = function() {
  return this.eGui;
};

// gets called whenever the user gets the cell to refresh
AddressCellRenderer.prototype.refresh = function() {
  // return true to tell the grid we refreshed successfully
  return true;
};

export default AddressCellRenderer;