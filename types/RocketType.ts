export type FormRocketType = {
  id?: number | null | undefined | string | string[]
  name: string
  description?: string | null
  remark?: string | null
  status?: number
}

export type RocketResponseType = {
  docs: RocketType[]
  totalDocs: number
  offset: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: any
  nextPage: any
}

export type RocketType = {
  height: HeightType
  diameter: DiameterType
  mass: MassType
  first_stage: FirstStageType
  second_stage: SecondStageType
  engines: EnginesType
  landing_legs: LandingLegsType
  payload_weights: PayloadWeightType[]
  flickr_images: string[]
  name: string
  type: string
  active: boolean
  stages: number
  boosters: number
  cost_per_launch: number
  success_rate_pct: number
  first_flight: string
  country: string
  company: string
  wikipedia: string
  description: string
  id: string
}

export type HeightType = {
  meters: number
  feet: number
}

export type DiameterType = {
  meters: number
  feet: number
}

export type MassType = {
  kg: number
  lb: number
}

export type FirstStageType = {
  thrust_sea_level: ThrustSeaLevelType
  thrust_vacuum: ThrustVacuumType
  reusable: boolean
  engines: number
  fuel_amount_tons: number
  burn_time_sec: number
}

export type ThrustSeaLevelType = {
  kN: number
  lbf: number
}

export type ThrustVacuumType = {
  kN: number
  lbf: number
}

export type SecondStageType = {
  thrust: ThrustType
  payloads: PayloadsType
  reusable: boolean
  engines: number
  fuel_amount_tons: number
  burn_time_sec: number
}

export type ThrustType = {
  kN: number
  lbf: number
}

export type PayloadsType = {
  composite_fairing: CompositeFairingType
  option_1: string
}

export type CompositeFairingType = {
  height: Height2Type
  diameter: Diameter2Type
}

export type Height2Type = {
  meters: number
  feet: number
}

export type Diameter2Type = {
  meters: number
  feet: number
}

export type EnginesType = {
  isp: IspType
  thrust_sea_level: ThrustSeaLevel2Type
  thrust_vacuum: ThrustVacuum2Type
  number: number
  type: string
  version: string
  layout: string
  engine_loss_max: number
  propellant_1: string
  propellant_2: string
  thrust_to_weight: number
}

export type IspType = {
  sea_level: number
  vacuum: number
}

export type ThrustSeaLevel2Type = {
  kN: number
  lbf: number
}

export type ThrustVacuum2Type = {
  kN: number
  lbf: number
}

export type LandingLegsType = {
  number: number
  material: string
}

export type PayloadWeightType = {
  id: string
  name: string
  kg: number
  lb: number
}
