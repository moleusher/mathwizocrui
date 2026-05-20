import type { Meta, StoryObj } from '@storybook/react';
import { TeacherCommentPanel } from './TeacherCommentPanel';

const meta: Meta<typeof TeacherCommentPanel> = {
  title: 'Components/TeacherCommentPanel',
  component: TeacherCommentPanel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TeacherCommentPanel>;

export const Default: Story = {
  args: {
    comment: '上面错了。以为21.4才是宽。',
  },
};

export const LongComment: Story = {
  args: {
    comment:
      '这道题的解题思路是正确的，但在第三步计算时出现了错误。$3.14 \\times 4 = 12.56$，而不是 $12.56$。另外，最后的结果没有写单位，考试中会被扣分。建议做完后复查一遍计算过程。',
  },
};

export const ShortComment: Story = {
  args: {
    comment: '✓ 注意单位',
  },
};
