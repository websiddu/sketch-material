export class MDStrip {
  constructor(options) {
    this.initilize();
  }

  initilize() {
    const StackView = NSStackView.alloc().initWithFrame(NSMakeRect(0, 0, 40, 400));

    var E = MSDocument.currentDocument().documentWindow().contentView().subviews().objectAtIndex(0);

    var I = [];

    E.subviews().forEach(function (t) {
      I.push(t)
    })

    I.splice(2, 0, StackView);

    E.subviews = I;
    E.adjustSubviews()

  }

}
