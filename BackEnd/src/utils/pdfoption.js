const options = {
  format: 'A3',
  orientation: 'portrait',
  border: '8mm',
  header: {
    height: '15mm',
    contents: '<h4 style="color:red; font-family:\'Kalam\' ;font-size:40;font-weight:800;text-align:center;">Tiny Treasure</h4>'
  },
  footer: {
    height: '20mm',
    contents: {
      first: 'Cover page',
      "2": 'second page',
      default: '<span style="color:#444;">{{page}}</span>/<span>{{pages}}</span>',
      last: 'Last Page'
    }
  }
};

export { options };
