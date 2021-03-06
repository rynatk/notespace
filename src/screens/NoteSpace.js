import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import styled from '@emotion/native'
import IoniconIcon from 'react-native-vector-icons/Ionicons'

import { NoteBlock, NoteScroll, Screen, Header, Icon } from '../components'
import { createConsumer } from '../context/createConsumer'
import theme from '../utils/theme'

const ICON_SIZE = 40

class NoteSpace extends Component {
  renderAddNoteIcon = () => {
    const { navigation, actions } = this.props
    const { noteSpaceId } = navigation.state.params

    return (
      <Icon
        iconName="md-add"
        handlePress={() => {
          actions.addNote(noteSpaceId, (noteId) => navigation.navigate('Note', { noteId }))
        }}
      />
    )
  }

  render() {
    const { noteSpaces, notes, navigation } = this.props
    const { noteSpaceId } = navigation.state.params

    const activeNoteSpace = noteSpaces.find(({ id }) => id === noteSpaceId)
    const { noteIds } = activeNoteSpace
    const activeNotes = notes.filter(note => noteIds.includes(note.id))

    return (
      <Screen>
        <Header right={this.renderAddNoteIcon()} />
        <NoteScroll noteSpace={activeNoteSpace} notes={activeNotes} />
      </Screen>
    )
  }
}

export default createConsumer(NoteSpace)