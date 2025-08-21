import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
  },
};

export const WithError: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    invalid: true,
    errorMessage: "This field is required",
  },
};
