import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction } from 'react';
import { EditorProps, EditorState } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import Button from '../Common/Button';

const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  {
    ssr: false,
  },
);

type CustomEditorProps = {
  editorState: EditorState;
  readOnly?: boolean;
  onSave?: () => void;
  onEditorStateChange?: Dispatch<SetStateAction<EditorState | undefined>>;
};

export default function CustomEditor({
  editorState,
  readOnly = false,
  onSave,
  onEditorStateChange,
}: CustomEditorProps) {
  return (
    <Wrapper>
      <Editor
        readOnly={readOnly}
        editorState={editorState}
        toolbarHidden={readOnly}
        wrapperClassName="wrapper-class"
        toolbarClassName="editorToolbar-hidden"
        editorClassName="editor-class"
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ['inline', 'list', 'textAlign', 'link'],
        }}
        localization={{
          locale: 'ko',
        }}
      />
      {/* {!readOnly && <Button onClick={onSave}>Save</Button>} */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 16px;
`;
