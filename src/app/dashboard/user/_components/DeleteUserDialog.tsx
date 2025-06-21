import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";
import { deleteUser } from "../action";

interface DeleteUserDialogProps {
	userId: number;
	open: boolean;
	toggle: () => void;
	setClose: () => void;
}

export default function DeleteUserDialog({
	userId,
	open,
	toggle,
	setClose,
}: DeleteUserDialogProps) {
	const handleClickDelete = async () => {
		await deleteUser(userId);
		setClose();
	};

	return (
		<Dialog.Root role="alertdialog" lazyMount open={open} onOpenChange={toggle}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>Delete Author</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							Are you sure you want to delete with id{" "}
							<Text as="span" fontWeight="bold">
								{userId}
							</Text>
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button variant="outline">Cancel</Button>
							</Dialog.ActionTrigger>
							<Button colorPalette="red" onClick={handleClickDelete}>
								Delete
							</Button>
						</Dialog.Footer>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm" />
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
