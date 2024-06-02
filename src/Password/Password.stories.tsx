import Password from "./index";
import { userEvent, within, expect } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Password",
  component: Password,
  decorators: [
    (Story) => (
      <div className="text-center container">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Password Component
        </h1>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Password>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllOptions: Story = {
  args: {
    options: ["specialChar", "digit", "uppercase", "noConsecutive"],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByTestId("item");
    const password = canvas.getByTestId("password");

    await step(
      "A correct password must display all requirements with a checkmark icon.",
      async () => {
        await userEvent.type(password, "Masterpiece2-2");

        for (const item of items) {
          await expect(
            within(item).getByLabelText("success")
          ).toBeInTheDocument();
        }
      }
    );

    (password as HTMLInputElement).value = "";

    await step(
      "An incorrect password must display the specific requirement that is failing, along with an error icon.",
      async () => {
        await userEvent.type(password, "Blank*Space");

        const hasANumber = items.find((item) =>
          item.innerText.includes("Has a number")
        );

        if (!hasANumber) {
          throw new Error("There must be an item with 'Has a number' text");
        }

        expect(within(hasANumber).getByLabelText("error")).toBeInTheDocument();
        expect(within(canvasElement).getAllByLabelText("success")).toHaveLength(
          3
        );
      }
    );
  },
};

export const OnlySpecialChar: Story = {
  args: {
    options: ["specialChar"],
  },
};

export const OnlyDigit: Story = {
  args: {
    options: ["digit"],
  },
};

export const OnlyUppercase: Story = {
  args: {
    options: ["uppercase"],
  },
};

export const OnlyNoConsecutive: Story = {
  args: {
    options: ["noConsecutive"],
  },
};

export const Styling: Story = {
  args: {
    options: ["specialChar", "digit", "uppercase", "noConsecutive"],
    className: "bg-gray-200 flex-col p-2",
    inputClassName: "self-start",
    listClassName: "italic",
    successColor: "text-blue-700",
    errorColor: "text-pink-700",
  },
};
