import * as React from 'react';

type State = {
  width: number;
};

type Props = {};

export default class ReadingBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      width: 0
    };
  }

  componentDidMount() {
    
    // Check for client side rendering
    if (window && document) {
      window.addEventListener('scroll', this.updateBar);
      document.body.addEventListener('scroll', this.updateBar);
    }
  }

  componentWillUnmount() {

    // Check for client side rendering
    if (window && document) {
      window.removeEventListener('scroll', this.updateBar);
      document.body.removeEventListener('scroll', this.updateBar);
    }
  }

  private getMaxScroll = () => {
    return this.getDocumentHeight() - this.getWindowHeight();
  };

  /**
   * Get current vertical scroll percentage
   */
  private getScrollPercentage = () => {
    return (this.getWindowScroll() / this.getMaxScroll()) * 100;
  };

  private updateBar = () => {
    const perc = this.getScrollPercentage();
    this.setState({
      width: perc
    });
  };

  /**
   * Get current absolute document height
   */
  private getDocumentHeight = () => {
    return Math.max(
      document.body.scrollHeight || 0,
      document.documentElement.scrollHeight || 0,
      document.body.offsetHeight || 0,
      document.documentElement.offsetHeight || 0,
      document.body.clientHeight || 0,
      document.documentElement.clientHeight || 0
    );
  };

  /**
   * Get current browser viewpane heigtht
   */
  private getWindowHeight = () => {
    return (
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight ||
      0
    );
  };

  /**
   * Get current absolute window scroll position
   */
  private getWindowScroll = () => {
    return (
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop ||
      0
    );
  };

  render() {
    return (
      <div style={{ width: `${this.state.width}%` }} className='reading-bar' />
    );
  }
}
