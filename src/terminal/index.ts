// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import {
  TerminalWidget, ITerminalOptions
} from 'jupyter-js-terminal';

import {
  Token
} from 'phosphor-di';



/**
 * A factory for creating a Jupyter editor.
 */
export
interface ITerminalProvider {

  /**
   * Create a new Terminal instance.
   */
  createTerminal(options?: ITerminalOptions): TerminalWidget;
}


/**
 * The dependency token for the `ITerminalProvider` interface.
 */
export
const ITerminalProvider = new Token<ITerminalProvider>('jupyter-js-plugins.ITerminalProvider');
