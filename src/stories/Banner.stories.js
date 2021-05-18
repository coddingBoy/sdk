
import React from 'react';

import { Banner } from '../../components';
import '../../components/banner/style/banner.scss'
import './button.css'

export default {
  title: 'Example/Banner',
  component: Banner,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Banner {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title: 'title'
};

