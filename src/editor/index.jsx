import './styles.css';
import {
  BubbleMenu,
  EditorContent,
  FloatingMenu,
  useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import React, { useCallback } from 'react';
import Link from '@tiptap/extension-link';
import MenuBar from './menubar';
import './table-styles.scss';

export const TiptapEditor = () => {
  const editor = useEditor({
    content: 'type here...',
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),

      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
  });

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <>
      {editor && (
        <div className='container'>
          <MenuBar editor={editor} />

          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <div className='bubble-menu'>
              <button
                onClick={setLink}
                className={editor.isActive('link') ? 'is-active' : ''}
              >
                paste url
              </button>
            </div>
          </BubbleMenu>

          <FloatingMenu
            editor={editor}
            tippyOptions={{ duration: 100, placement: 'top' }}
            shouldShow={(editor) => {
              const { $from, $to } = editor.state.selection;
              if (
                $from.depth > 0 &&
                $from.node($from.depth - 1).type.name.includes('table')
              ) {
                return true;
              }
              return false;
            }}
          >
            <div className='table-menu'>
              <button
                onClick={() => editor.chain().focus().addColumnBefore().run()}
              >
                addColumnBefore
              </button>
              <button
                onClick={() => editor.chain().focus().addColumnAfter().run()}
              >
                addColumnAfter
              </button>
              <button
                onClick={() => editor.chain().focus().deleteColumn().run()}
              >
                deleteColumn
              </button>
              <button
                onClick={() => editor.chain().focus().addRowBefore().run()}
              >
                addRowBefore
              </button>
              <button
                onClick={() => editor.chain().focus().addRowAfter().run()}
              >
                addRowAfter
              </button>
              <button onClick={() => editor.chain().focus().deleteRow().run()}>
                deleteRow
              </button>
              <button
                onClick={() => editor.chain().focus().deleteTable().run()}
              >
                deleteTable
              </button>
            </div>
          </FloatingMenu>

          <EditorContent className='editor-content' editor={editor} />
        </div>
      )}
    </>
  );
};

export default TiptapEditor;
