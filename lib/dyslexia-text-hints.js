'use babel';

import DyslexiaTextHintsView from './dyslexia-text-hints-view';
import { CompositeDisposable } from 'atom';

export default {

  dyslexiaTextHintsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.dyslexiaTextHintsView = new DyslexiaTextHintsView(state.dyslexiaTextHintsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.dyslexiaTextHintsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'dyslexia-text-hints:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.dyslexiaTextHintsView.destroy();
  },

  serialize() {
    return {
      dyslexiaTextHintsViewState: this.dyslexiaTextHintsView.serialize()
    };
  },

  toggle() {
    console.log('DyslexiaTextHints was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
