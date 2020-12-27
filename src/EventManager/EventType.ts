const EventTypePool = {
  TEST: "TEST",

  ON_CONTEXT_CREATE: "ON_CONTEXT_CREATE",

  // camera module
  CAMERA_MOVE: "CAMERA_MOVE",
  WINDOW_RESIZE: "WINDOW_RESIZE",
  MOUSE_MOUSE: "MOUSE_MOVE"
} as const

type EventType = typeof EventTypePool[keyof typeof EventTypePool]

export default EventType
