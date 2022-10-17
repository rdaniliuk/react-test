import React from 'react';
import MyInput from './Shared/input/MyInput';

class Page extends React.Component<unknown, { input: string }> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      input: localStorage.getItem('input') || '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(value: string) {
    this.setState({ input: value }, () => {
      localStorage.setItem('input', value);
    });
  }

  render(): React.ReactNode {
    this.state;
    return (
      <>
        <MyInput value={this.state.input} onChange={this.onChange} />
      </>
    );
  }
}

export default Page;
