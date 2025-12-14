import React from "react";
import {Button, Card, Text} from "@ui-kitten/components";

interface CreateWalletModalProps {
    onClose: () => void;
}

const CreateWalletModal: React.FC<CreateWalletModalProps> = ({
                                                                 onClose,
                                                             }) => {

    return (
        <Card disabled={true}>
            <Text>
                Welcome to UI Kitten 😻
            </Text>
            <Button onPress={() => onClose()}>
                DISMISS
            </Button>
        </Card>
    )
}

export default CreateWalletModal;