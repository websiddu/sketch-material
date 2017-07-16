(function () {

  var _submit,
    _renderTable,
    _getWidths,
    _addRow,
    _enableColResize,
    headers = [],
    cells = [];

  var data = function () {
    return Handsontable.helper.createSpreadsheetData(3, 5);
  };

  var container = document.getElementById('sheet');

  window.hot = new Handsontable(container, {
    data: data(),
    minSpareCols: 0,
    minSpareRows: 0,
    minRows: 1,
    minCols: 1,
    manualColumnResize: true,
    rowHeaders: false,
    colHeaders: true,
    contextMenu: true,
    fixedRowsTop: 1,
    height: 490,
    contextMenu: ['row_above', 'row_below', 'col_left', 'col_right', '---------', 'remove_row', 'remove_col', '---------', 'alignment']
  });


  var _getColWidths = function () {
    var headers = hot.countCols(), widths = '', metas = '';
    for (var i = 0; i < headers; i++) {
      widths = widths + hot.getColWidth(i) + '|';
      var alignment = hot.getCellMeta(0, i).className ? hot.getCellMeta(0, i).className : 'htLeft';
      metas = metas + alignment + '|'
    }

    return {
      widths: widths,
      metas: metas
    };
  }

  var _getDataAtCol = function () {
    var colsCount = hot.countCols(), rowsData = [];
    for (var i = 0; i < colsCount; i++) {
      var col = hot.getDataAtCol(i);
      col.shift();
      rowsData.push(col.join('\n'));
    }
    return rowsData.join('|');
  }

  var _getProps = function () {
    var layout = $('[name="layout"]:checked').val() || 'M',
      hasPagination = $('#hasPagination:checked').val() || 'off',
      hasShadow = $('#hasShadow:checked').val() || 'off',
      hasCaption = $('#hasCaption:checked').val() || 'off',
      hasCheckboxes = $('#hasCheckboxes:checked').val() || 'off';

    return [hasCaption, hasShadow, hasPagination, layout, hasCheckboxes].join('|');
  }

  _toggleCheckBoxes = function () {
    $('.checkbox').toggleClass('hide');
  }

  _togglePagination = function () {
    $('.min-table-footer').toggleClass('hide');
  }

  _toggleCaption = function () {
    $('.mini-caption-text').toggleClass('hide');
  }

  _toggleShadow = function () {
    $('.mini-table').toggleClass('mdl-shadow--2dp');
  }

  _switchSizes = function () {
    $('.mini-table-body').attr('class', 'mini-table-body ' + this.value);
  }

  _submit = function () {
    var options = {};
    options.headers = hot.getDataAtRow(0).join('|');
    options.cells = _getDataAtCol();
    options.widths = _getColWidths().widths;
    options.metas = _getColWidths().metas;
    options.props = _getProps();
    options.caption = $('#tableCaption').val().trim();
    ga('send', 'event', 'table panel', 'submit', 'tables');
    MDAction('submit', options);
  }

  $('#submit').on('click', _submit);
  $('#hasCheckboxes').on('change', _toggleCheckBoxes);
  $('#hasCaption').on('change', _toggleCaption);
  $('#hasShadow').on('change', _toggleShadow);
  $('#hasPagination').on('change', _togglePagination);
  $('[name="layout"]').on('change', _switchSizes);

})();
