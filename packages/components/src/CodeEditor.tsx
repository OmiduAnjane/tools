import { forwardRef, useEffect, useState } from 'react';
import CodeMirror, { ReactCodeMirrorRef, ReactCodeMirrorProps, EditorView } from '@uiw/react-codemirror';

const borderRadius = EditorView.theme({
  '.cm-scroller, &': {
    borderRadius: '6px',
  },
  '&': {
    border: '1px solid var(--color-border-default)',
  },
});

const defalutTheme = document.documentElement.getAttribute('data-color-mode') as Theme;
type Theme = ReactCodeMirrorProps['theme'];

export const CodeEditor = forwardRef<ReactCodeMirrorRef, ReactCodeMirrorProps>((props, ref) => {
  const { extensions = [], theme: pTheme } = props;
  const [theme, setTheme] = useState<Theme>(pTheme || defalutTheme);
  useEffect(() => {
    const val = document.documentElement.getAttribute('data-color-mode') as Theme;
    setTheme(val);
    document.addEventListener('colorschemechange', (e) => {
      setTheme((e as any).detail.colorScheme);
    });
  }, []);
  return <CodeMirror ref={ref} {...props} extensions={[borderRadius, ...extensions]} theme={theme} />;
});
