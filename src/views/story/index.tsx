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
  Link,
} from '@chakra-ui/react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { DFButton } from '../../components/fields/DFButton'
import { DFTextfield } from '../../components/fields/DFTextfield'
import { ThreeDotsWave } from '@/components/Loader'

// const apiUrl = 'https://testapi-4mdp.onrender.com'
const apiUrl = 'http://localhost:3001'

const StoryBoard = () => {
  const [stories, setStories] = useState<any[]>([])
  const [selectedStory, setSelectedStory] = useState<any>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [comments, setComments] = useState<string>('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    setIsPending(true)
    const res = await fetch(`${apiUrl}/api/stories`)
    const data = await res.json()
    setIsPending(false)
    setStories(data)
    setSelectedStory(data.find((d: any) => d._id === selectedStory._id))
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
    const selectedCard = (stories ?? []).find((it) => it._id === result.draggableId)
    selectedCard.status = result.destination.droppableId
    await fetch(`${apiUrl}/api/stories/${selectedCard._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: selectedCard.status }),
    })
    setStories(
      stories.map((st) => ({
        ...st,
        status: st._id === selectedCard._id ? selectedCard.status : st.status,
      }))
    )
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

  const isLink = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    return urlRegex.test(text)
  }

  const CommentText = ({ text }: { text: string }) => {
    if (isLink(text)) {
      return (
        <Link href={text} color='blue.500' isExternal>
          {text}
        </Link>
      )
    }
    return <Text>{text}</Text>
  }

  return (
    <Box p={6} bg='gray.50' minH='100vh'>
      <Heading mb={6} textAlign='center' fontSize='2xl'>
        User Story Board
      </Heading>
      <Flex alignContent='center' justifyContent='center' mb={6}>
        <DFButton label='New User Story' onClick={() => openModal()} />
      </Flex>
      {isPending && (
        <Flex alignContent='center' justifyContent='center' mb={6}>
          <ThreeDotsWave />
        </Flex>
      )}
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
                  <CommentText text={comment} />
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
