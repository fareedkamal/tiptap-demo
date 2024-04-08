import { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className='menubar'>
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        insertTable
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        underline
      </button>
      <TextSelection editor={editor} />
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
      >
        left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
      >
        center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
      >
        right
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
      >
        justify
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        toggleBlockquote
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        toggleBulletList
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        toggleOrderedList
      </button>
      <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button>

      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        redo
      </button>
    </div>
  );
};

const TextSelection = ({ editor }) => {
  const [style, setStyle] = useState('paragraph');

  const handleChange = (event) => {
    setStyle(event.target.value);
  };

  useEffect(() => {
    const { $from, $to } = editor.state.selection;
    const node = $from.node($from.depth);
    if (node.type.name === 'heading') {
      const level = node.attrs.level;
      setStyle(`h${level}`);
    } else if (node.type.name === 'paragraph') {
      setStyle('paragraph');
    }
  }, [editor.state]);

  return (
    <Select value={style} onChange={handleChange}>
      <MenuItem
        onClick={() => editor.chain().focus().setParagraph().run()}
        value={'paragraph'}
      >
        Paragraph
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        value={'h1'}
      >
        Heading 1
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        value={'h2'}
      >
        Heading 2
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        value={'h3'}
      >
        Heading 3
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        value={'h4'}
      >
        Heading 4
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        value={'h5'}
      >
        Heading 5
      </MenuItem>
      <MenuItem
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        value={'h6'}
      >
        Heading 6
      </MenuItem>
    </Select>
  );
};

export default MenuBar;
