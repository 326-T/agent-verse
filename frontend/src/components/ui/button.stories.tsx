import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
	title: "shadcn/Button",
	component: Button,
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = { args: { children: "Hello World" } };
export const Outline: Story = {
	args: { variant: "outline", children: "Outline" },
};
export const Destructive: Story = {
	args: { variant: "destructive", children: "Delete" },
};
