export interface USDInARG {
  oficial: Blue;
  blue: Blue;
  oficial_euro: Blue;
  blue_euro: Blue;
  last_update: Date;
}

export interface Blue {
  value_avg: number;
  value_sell: number;
  value_buy: number;
}
