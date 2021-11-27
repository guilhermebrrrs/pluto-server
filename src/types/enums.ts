enum CollectionStatus {
  ACCEPTED,
  CANCELED,
  COMPLETED,
  NOT_STARTED,
  OPENED,
  PAUSED,
}

enum MaterialType {
  GLASS,
  HAZARDOUS_MATERIALS,
  HOSPITAL_WASTE,
  METALS,
  NON_RECYCLABLE,
  ORGANIC_WASTE,
  PAPERS,
  PLASTICS,
  RADIOACTIVE_MATERIALS,
  WOODS,
}

enum OrganizationType {
  CATADOR,
  COOPERATIVA,
  EMPRESA_PRIVADA,
}

enum WeekDays {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

export { CollectionStatus, MaterialType, OrganizationType, WeekDays };
