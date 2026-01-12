'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Typography from '@tiptap/extension-typography';
import { EditorToolbar } from './EditorToolbar';
import { useEffect, useCallback } from 'react';

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: boolean;
}

export function TiptapEditor({
  value,
  onChange,
  placeholder = 'Write your content here...',
  error,
}: TiptapEditorProps) {
  const handleUpdate = useCallback(
    (html: string) => {
      onChange(html);
    },
    [onChange]
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Typography,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      handleUpdate(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose prose-lg dark:prose-invert max-w-none min-h-[250px] p-4 focus:outline-none ${
          error ? 'border-2 border-destructive' : ''
        }`,
      },
    },
    immediatelyRender: false,
  });

  // Handle external value changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // Show loading state during SSR
  if (!editor) {
    return (
      <div
        className={`rounded-lg border-2 ${error ? 'border-destructive' : 'border-input'} bg-background min-h-[250px]`}
      >
        <div className="h-full p-4 flex items-center justify-center">
          <div className="text-muted-foreground text-sm">Loading editor...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg border-2 ${error ? 'border-destructive' : 'border-input'} bg-background`}
    >
      <EditorToolbar editor={editor} />
      <div className="min-h-[250px] max-h-[500px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
