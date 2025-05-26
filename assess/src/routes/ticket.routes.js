import { Router } from "express";
import { TicketController } from "../controllers/ticket.controller.js";
export const router=Router()

router.get('/',TicketController.getTickets)
router.post('/add',TicketController.createTicket)
router.post('/assign/:ticketId',TicketController.assignTicket)
router.put('/status/:ticketId',TicketController.changeTicketstatus)
router.delete('/:ticketId',TicketController.deleteTicket)