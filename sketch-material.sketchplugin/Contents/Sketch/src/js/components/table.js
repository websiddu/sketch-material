// table.js
MD['Table'] = function () {
  // Functions
  var _generateTable,
    _showTablePanel,
    _makeCheckBoxes;

  // Constants
  var BLACK = MD.hexToNSColor('000000', 0.87),
    GREY = MD.hexToNSColor('000000', 0.54),
    FONT = 'Roboto',
    FONT_MEDIUM = 'Roboto Medium',
    LEFT_ALIGN = 0,
    RIGHT_ALIGN = 1,
    PADDING = 24,

    FONT_SIZE = {
      CAPTION: 20,
      HEADER: 12,
      CONTENT: 13
    },

    ROW_HEIGHT = {
      S: 33,
      M: 41,
      L: 49
    },

    LEADING = {
      S: 18.1,
      M: 25.7,
      L: 33.9
    },

    LINE_HEIGHT = {
      CAPTION: 20,
      CONTENT: 15
    },

    CAPTION_HEIGHT = {
      M: 64
    };

  // Styles
  var
    headerStyle = function (rtl, l) {
      var name = rtl == 0 ? '…table-header-' + l : '…table-header-rtl-' + l;

      return MD.sharedTextStyle(name,
        GREY, rtl,
        FONT_MEDIUM, FONT_SIZE.HEADER,
        LINE_HEIGHT.CONTENT, LEADING[l]);
    },

    tableContentStyle = function (rtl, l) {
      var name = rtl == 0 ? '…table-content-' + l : '…table-content-rtl-' +  l;
      return MD.sharedTextStyle(name,
        BLACK, rtl,
        FONT, FONT_SIZE.CONTENT,
        LINE_HEIGHT.CONTENT, LEADING[l])
    },

    lineStyle = MD.sharedLayerStyle("…table-divider", MD.hexToNSColor('000000', 0.12)),

    captionStyle = MD.sharedTextStyle('…table-caption',
      BLACK, 0,
      FONT, FONT_SIZE.CAPTION,
      LINE_HEIGHT.CAPTION);

  // Parts
  var headers,
    columns,
    widths,
    metas,
    props;

  // Groups
  var columnGroup,
    tableGroup,
    checkBoxGroup,
    paginationGroup,
    linesGroup;

  // Counts
  var rowCount;

  // Coordinates
  var x = PADDING + 18 + PADDING,
    y = 0;

  // Spacings
  var gapBetweenCols = 24;

  // Captions
  var caption,
    captionRect,
    captionX = PADDING,
    captionY = (CAPTION_HEIGHT.M - FONT_SIZE.CAPTION) / 2;

  _generateTable = function () {
    _showTablePanel();
  }
  _importRequiredSymbols = function () {
    // MD.import('icons', 'symbols', ['Forms/checkbox/unchecked/16']);
    MD.import('tables');
  }

  _showTablePanel = function () {
    if (MD.tablePanel()) {
      _importRequiredSymbols();
      _parseDataFromPanel();
      _getTableSize();
      _createGroups();
      _makeCols();
      _makeLines();
      _addCaption();
      _addPagination();
      _addCard();
      _addGroupsToTable();
    }
  }

  _parseDataFromPanel = function () {
    headers = _parseDataFromString(MD.configs.table.headers, '|');
    columns = _parseDataFromString(MD.configs.table.cells, '|');
    widths = _parseDataFromString(MD.configs.table.widths, '|');
    metas = _parseDataFromString(MD.configs.table.metas, '|');
    props = _parseDataFromString(MD.configs.table.props, '|');
  }

  _parseDataFromString = function (str, sep) {
    // nsString = NSString.alloc().initWithUTF8String(str);
    // return nsString.componentsSeparatedByString(sep);
    return str.split(sep);
  }

  _makeCols = function () {

    if (props[4] == 'off') {
      x = PADDING;
    }

    for (var i = 0; i < headers.length; i++) {
      var col = MD.addText(),
        header = MD.addText(),
        line = MD.addShape(),
        colGroup = MD.addGroup(),
        layoutSize = props[3];

      header.setStringValue(headers[i]);
      col.setStringValue(columns[i]);

      header.setStyle(headerStyle(0, layoutSize));
      col.setStyle(tableContentStyle(0, layoutSize));

      if (metas[i] == 'htRight') {
        header.setStyle(headerStyle(1, layoutSize));
        col.setStyle(tableContentStyle(1, layoutSize));
      }

      headerRect = MD.getRect(header);
      headerRect.setX(x);
      headerRect.setY(CAPTION_HEIGHT.M + (ROW_HEIGHT[layoutSize] - LINE_HEIGHT.CONTENT)/2);
      headerRect.setWidth(widths[i]);

      colRect = MD.getRect(col);
      colRect.setX(x);
      colRect.setY(CAPTION_HEIGHT.M + ROW_HEIGHT[layoutSize] + (ROW_HEIGHT[layoutSize] - LINE_HEIGHT.CONTENT)/2 + 1);
      colRect.setWidth(widths[i]);

      x =  gapBetweenCols + x + parseInt(widths[i]);

      colGroup.setName('col #' + i)
      colGroup.addLayers([col, header]);
      colGroup.resizeToFitChildrenWithOption(0);
      columnGroup.addLayers([colGroup]);
    }
  }

  _makeLines = function () {
    var checkBox = MD.findSymbolByName('Forms/checkbox/unchecked/16');

    for (var k = 0; k < rowsCount + 1; k++) {
      var line,
        lineRect,
        layoutSize = props[3],
        check = checkBox.newSymbolInstance(),
        checkRect = MD.getRect(check);

      line = MD.addShape();
      lineRect = MD.getRect(line);

      line.setStyle(lineStyle);
      tableHeight = ((k + 1) * ROW_HEIGHT[layoutSize]) + CAPTION_HEIGHT.M;
      lineRect.setY(tableHeight);

      if (props[4] == 'on') {
        checkRect.setY(tableHeight - checkRect.height - (ROW_HEIGHT[layoutSize] - checkRect.height) / 2);
        checkRect.setX(PADDING);
        checkBoxGroup.addLayers([check]);
      }

      lineRect.setX(0);
      lineRect.setHeight(1);
      lineRect.setWidth(x);
      linesGroup.setName('dividers')
      linesGroup.addLayers([line]);

    }
  }


  _addCaption = function () {
    caption = MD.addText(),
    captionRect = MD.getRect(caption),

    caption.setName('caption');
    caption.setStringValue(MD.configs.table.caption);
    caption.setStyle(captionStyle);
    captionRect.setX(captionX);
    captionRect.setY(captionY);
  }

  _addCard = function () {
    bg = MD.addShape();
    bg.setName('card')
    var bgRect = MD.getRect(bg);;
    MD.import('elevation', '…elevation-02dp');

    if (props[1] == 'on') {
      bg.setStyle(MD.sharedLayerStyle("…elevation-02dp"));
      bg.layers().firstObject().setCornerRadiusFromComponents("2");
    }

    bgRect.setWidth(x);
    bgRect.setHeight(tableHeight);
  }

  _addPagination = function () {
    if (props[2] == 'off') {
      return;
    }

    var pagination = MD.findSymbolByName('…table-pagination');
    paginationInstance = pagination.newSymbolInstance();

    paginationGroup.addLayers([paginationInstance]);
    paginationInstanceRect = MD.getRect(paginationInstance);

    paginationRect = MD.getRect(paginationGroup);
    paginationRect.setY(tableHeight);
    paginationRect.setX(x - paginationInstanceRect.width);
    paginationGroup.resizeToFitChildrenWithOption(0);
    tableHeight = tableHeight + paginationInstanceRect.height;
  }


  _createGroups = function () {
    columnGroup = MD.addGroup();
    columnGroup.setName('columns');

    headerGroup = MD.addGroup();
    headerGroup.setName('headers');

    linesGroup = MD.addGroup();
    linesGroup.setName('dividers');

    checkBoxGroup = MD.addGroup();
    checkBoxGroup.setName('checkboxes');


    paginationGroup = MD.addGroup();
    paginationGroup.setName('pagination');
  }

  _getTableSize = function () {
    rowsCount = columns[0].split('\n').length;
  }

  _addGroupsToTable = function () {
    columnGroup.resizeToFitChildrenWithOption(0);
    columnGroup.setConstrainProportions(false);
    linesGroup.resizeToFitChildrenWithOption(0);
    linesGroup.setConstrainProportions(false);
    paginationGroup.resizeToFitChildrenWithOption(0);
    paginationGroup.setConstrainProportions(false);

    tableGroup = MD.addGroup();
    tableGroup.setConstrainProportions(false);
    tableGroup.setName('table');
    tableGroup.addLayers([bg, linesGroup, checkBoxGroup, paginationGroup, columnGroup, caption]);
    tableGroup.resizeToFitChildrenWithOption(0);

    var tableGroupRect = MD.getRect(tableGroup);
    tableGroupRect.setX(MD.getCenterOfViewPort().x - (tableGroupRect.width * 0.5));
    tableGroupRect.setY(MD.getCenterOfViewPort().y - (tableGroupRect.height * 0.5));

    MD.current.addLayers([tableGroup]);
  }

  return {
    generateTable: function () {
      _generateTable();
    }
  }
};
