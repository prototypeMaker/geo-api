import React from 'react'
import { Header, Left, Button, Icon, Right, Body, Title, Subtitle } from 'native-base'


export default function TopSection() {
    return <>
          <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>
            Backpack Tracker
          </Title>
          <Subtitle>
            Always know where your physical backpack is
          </Subtitle>
        </Body>
        <Right>
          <Icon name='more' />
        </Right>
      </Header>
    </>
}