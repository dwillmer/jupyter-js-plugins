// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.
'use strict';

import {
  NotebookWidget, NotebookModel, NBData, populateNotebookModel
} from 'jupyter-js-notebook';

import {
  Container
} from 'phosphor-di';

import {
  IContentsModel, IContentsManager
} from 'jupyter-js-services';

import {
  IServicesProvider, IFileOpener
} from '../index';

import {
  AbstractFileHandler
} from 'jupyter-js-filebrowser';

import {
  Widget
} from 'phosphor-widget';

import './plugin.css';

/**
 * Register the plugin contributions.
 *
 * @param container - The di container for type registration.
 *
 * #### Notes
 * This is called automatically when the plugin is loaded.
 */
export
function resolve(container: Container) {
  Promise.all([container.resolve(IServicesProvider),
               container.resolve(IFileOpener)]).then(([services, opener]) => {
    opener.register(new NotebookFileHandler(services.contentsManager))
  });
}


/**
 * An implementation of a file handler.
 */
export
class NotebookFileHandler extends AbstractFileHandler {

  /**
   * Get the list of file extensions supported by the handler.
   */
  get fileExtensions(): string[] {
    return ['.ipynb']
  }
  
  /**
   * Get file contents given a path.
   */
  protected getContents(path: string): Promise<IContentsModel> {
    return this.manager.get(path, { type: 'notebook' });
  }

  /**
   * Create the widget from an `IContentsModel`.
   */
  protected createWidget(path: string): Widget {
    let model = new NotebookModel();
    let widget = new NotebookWidget(model);
    widget.title.text = path.split('/').pop();
    return widget;
  }

  
  protected populateWidget(widget: NotebookWidget, model: IContentsModel): Promise<void> {
    let nbdata: NBData = makedata(model);
    populateNotebookModel(widget.model, nbdata);
    return Promise.resolve();
  }
}

function makedata(a: IContentsModel): NBData {
  return {
    content: a.content,
    name: a.name,
    path: a.path
  }
}