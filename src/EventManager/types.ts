const EventTypePool = {
  TEST: "TEST",
  ON_CONTEXT_CREATE: "ON_CONTEXT_CREATE",
  CAMERA_MOVE: "CAMERA_MOVE",
  WINDOW_RESIZE: "WINDOW_RESIZE",
  MOUSE_MOUSE: "MOUSE_MOVE",
  MOUSE_CLICK: "MOUSE_CLICK",
  MOUSE_DOUBLE_CLICK: "MOUSE_DOUBLE_CLICK"
} as const

type EventType = typeof EventTypePool[keyof typeof EventTypePool]

export default EventType
