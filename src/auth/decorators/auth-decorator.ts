import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/g-jwt";

export const Auth = () => UseGuards(JwtAuthGuard);