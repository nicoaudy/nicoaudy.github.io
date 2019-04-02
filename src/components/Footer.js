import React from 'react';

import { rhythm } from '../utils/typography';

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
          paddingTop: rhythm(1)
        }}
      >
        <a
          href="https://mobile.twitter.com/nicoaudy"
          target="_blank"
          rel="noopener noreferrer"
        >
          twitter
        </a>{' '}
        &bull;{' '}
        <a
          href="https://github.com/nicoaudy"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>{' '}
        &bull;{' '}
        <a
          href="https://www.linkedin.com/in/nico-audy-970066103"
          target="_blank"
          rel="noopener noreferrer"
        >linkedin</a>{' '}
      </footer>
    );
  }
}

export default Footer;
