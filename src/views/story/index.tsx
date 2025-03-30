import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Heading,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Textarea,
  Divider,
  Flex,
} from '@chakra-ui/react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { DFButton } from '../../components/fields/DFButton'
import { DFTextfield } from '../../components/fields/DFTextfield'

const apiUrl = 'https://testapi-4mdp.onrender.com'

const StoryBoard = () => {
  const [stories, setStories] = useState<any[]>([])
  const [selectedStory, setSelectedStory] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [comments, setComments] = useState<string>('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    const res = await fetch(`${apiUrl}/api/stories`)
    const data = await res.json()
    setStories(data)
  }

  const openModal = (story: any = null) => {
    if (story) {
      setSelectedStory(story)
      setTitle(story.title)
      setDescription(story.description)
    } else {
      setSelectedStory(null)
      setTitle('')
      setDescription('')
    }
    onOpen()
  }

  const handleSaveStory = async () => {
    const payload = { title, description, status: selectedStory?.status || 'todo' }
    if (selectedStory) {
      await fetch(`${apiUrl}/api/stories/${selectedStory._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch(`${apiUrl}/api/stories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }
    fetchStories()
    onClose()
  }

  const handleAddComment = async () => {
    if (selectedStory && comments.trim()) {
      await fetch(`${apiUrl}/api/stories/${selectedStory._id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: comments }),
      })
      fetchStories()
      setComments('')
    }
  }

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return
    const updatedStories = Array.from(stories)
    const [movedStory] = updatedStories.splice(result.source.index, 1)
    movedStory.status = result.destination.droppableId
    updatedStories.splice(result.destination.index, 0, movedStory)
    await fetch(`${apiUrl}/api/stories/${movedStory._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: movedStory.status }),
    })
    setStories(updatedStories)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'blue.100' // Light blue for 'todo'
      case 'in-progress':
        return 'yellow.100' // Light yellow for 'in-progress'
      case 'done':
        return 'green.100' // Light green for 'done'
      default:
        return 'gray.100' // Default color if no match
    }
  }

  return (
    <Box p={6} bg='gray.50' minH='100vh'>
      <Heading mb={6} textAlign='center' fontSize='2xl'>
        User Story Board
      </Heading>
      <Flex alignContent='center' justifyContent='center' mb={6}>
        <DFButton label='New User Story' onClick={() => openModal()} />
      </Flex>
      <DragDropContext onDragEnd={handleDragEnd}>
        <HStack spacing={4} align='start' justify='center'>
          {['todo', 'in-progress', 'done'].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <Box ref={provided.innerRef} {...provided.droppableProps} p={4} w='320px' minH='500px' bg='white' borderRadius='lg' boxShadow='md'>
                  <Text fontSize='lg' fontWeight='bold' mb={4} color='gray.600'>
                    {status.toUpperCase()}
                  </Text>
                  {stories
                    .filter((story) => story.status === status)
                    .map((story, index) => (
                      <Draggable key={story._id} draggableId={story._id} index={index}>
                        {(provided) => (
                          <Box
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            bg={getStatusColor(story.status)}
                            p={4}
                            mb={2}
                            // bg="gray.100"
                            borderRadius='md'
                            boxShadow='sm'
                            cursor='pointer'
                            onClick={() => openModal(story)}
                          >
                            <Text fontWeight='bold' color='gray.700'>
                              {story.title}
                            </Text>
                            {/* <Text fontSize="sm" color="gray.500">
                              {truncateDescription(story.description)}
                            </Text> */}
                            <Text fontSize='sm' color='gray.500'>
                              Assigned to: {story.assignedTo || 'Unassigned'}
                            </Text>
                          </Box>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          ))}
        </HStack>
      </DragDropContext>

      {/* Add/Edit Story Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size='5xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedStory ? `Story ${selectedStory.storyId}` : 'Add Story'}</ModalHeader>
          <ModalBody>
            <VStack spacing={4} align='stretch'>
              <DFTextfield label='Story Title' value={title} onChange={(e) => setTitle(e.target.value)} />
              <ReactQuill style={{ height: '30vh' }} theme='snow' value={description} onChange={setDescription} />
              <Divider mt={6} />
              <Heading size='sm'>Comments</Heading>
              {selectedStory?.comments?.map((comment: any, index: number) => (
                <Box key={index} p={3} bg='gray.100' borderRadius='md'>
                  <Text>{comment.text}</Text>
                </Box>
              ))}
              <Textarea placeholder='Add a comment...' value={comments} onChange={(e) => setComments(e.target.value)} />
              <Flex mt={2}>
                <DFButton label='Add Comment' onClick={handleAddComment} />
              </Flex>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <DFButton label={selectedStory ? 'Update' : 'Save'} onClick={handleSaveStory} />
            <Button variant='ghost' onClick={onClose} ml={2}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default StoryBoard
