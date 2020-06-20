import React from 'react'
import { Footer, FooterTab, Button, Text, Icon } from 'native-base'

export default function BottomSection() {

    return <>
        <Footer >
        <FooterTab>
        <Button vertical active>
        <Icon name='eye'/>
            <Text>
                Update 
            </Text>
        </Button>
        </FooterTab>
        </Footer>
    </>
}