import Expand from '@atlaskit/icon/glyph/arrow-down';
import Question from '@atlaskit/icon/glyph/question';
import Button from '../src';

const narrowWrapperStyle = {
  margin: '10px',
  padding: '10px',
  width: '190px',
  border: '1px solid red',

  '& > *': {
    marginBottom: '10px',
    '&:last-child': {
      marginBottom: 0,
    },
  },
};

export default () => (
  <div style={narrowWrapperStyle}>
    <div>
      <Button appearance="primary">I am wider than my parent</Button>
    </div>
    <div>
      <Button
        appearance="primary"
        iconBefore={<Question label="Icon before" />}
      >
        I am wider than my parent
      </Button>
    </div>
    <div>
      <Button appearance="primary" iconAfter={<Expand label="Icon after" />}>
        I am wider than my parent
      </Button>
    </div>
  </div>
);
