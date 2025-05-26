import { tickets } from "../models/ticket.model.js";
import { checkValue } from "../utils/common.utils.js";
import { v4 as uuid } from "uuid";
import { users } from "../models/user.model.js";
export class TicketController {
  static createTicket(req, res) {
    try {
      const { name } = req.body;
      const { id, role } = req.user;
      if (checkValue(name)) {
        return res.json({ success: false, message: "ticket name is invalid" });
      }
      if (checkValue(id)) {
        return res.json({ success: false, message: "invalid token" });
      }
      if (role !== "user") {
        return res.json({
          success: false,
          message: "you cannot create ticket and user only create ticket",
        });
      }
      tickets.push({
        id: uuid(),
        name,
        userId: id,
        status: "open",
      });
      return res.json({ success: true, message: "ticket created !" });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: err });
    }
  }
  static getTickets(req, res) {
    try {
      const { role, id } = req.user;
      if (checkValue(id)) {
        return res.json({ success: false, message: "token is invalid" });
      }
      if (checkValue(role)) {
        return res.json({ success: false, message: "invalid role in token" });
      }
      if (role === "user") {
        const filteredTickets = tickets.filter((e) => e.userId === id);
        return res.json({ success: true, tickets: filteredTickets });
      } else if (role === "admin") {
        return res.json({ success: true, tickets: tickets });
      } else if (role === "agent") {
        const filteredTickets = tickets.filter((e) => e.agentId === id);
        return res.json({ success: true, tickets: filteredTickets });
      } else {
        return res.json({ success: false, message: "invalid role" });
      }
    } catch (err) {
      console.log(err);
      return res.json({ success: false, message: err });
    }
  }
  static assignTicket(req, res) {
    try {
      const { agentId } = req.body;
      const { id, role } = req.user;
      const { ticketId } = req.params;
      if (checkValue(agentId)) {
        return res.json({
          success: false,
          message: "ticket agentId is invalid",
        });
      }
      if (checkValue(ticketId)) {
        return res.json({
          success: false,
          message: "ticket ticketId is invalid",
        });
      }
      if (checkValue(id)) {
        return res.json({ success: false, message: "invalid token" });
      }
      if (role !== "admin") {
        return res.json({
          success: false,
          message: "admin only assign the ticket",
        });
      }
      const ticket = tickets.filter((e) => (e.id = ticketId));
      if (ticket.length > 0) {
        const user = users.filter((e) => e.id === agentId);
        if (user.length > 0) {
          for (let i in tickets) {
            if (tickets[i].id === ticketId) {
              tickets[i].agentId = agentId;
              tickets[i].status = "assigned";
            }
          }
          return res.json({
            success: true,
            message: "assigned to agent successfully",
          });
        } else {
          return res.json({ success: false, message: "agent not found" });
        }
      } else {
        return res.json({ success: false, message: "ticket not found" });
      }
    } catch (err) {
      return res.json({ success: false, message: err });
    }
  }
  static changeTicketstatus(req, res) {
    try {
      const { status } = req.body;
      const { ticketId } = req.params;
      const { id, role } = req.user;
      if (checkValue(id)) {
        return res.json({ success: false, message: "token is invalid" });
      }
      if (checkValue(role)) {
        return res.json({ success: false, message: "invalid role in token" });
      }
      if (checkValue(status)) {
        return res.json({ success: false, message: "invalid Status" });
      }
      if (checkValue(ticketId)) {
        return res.json({ success: false, message: "invalid ticketId" });
      }
      if (role !== "admin" && role !== "agent") {
        return res.json({
          success: false,
          message: "admin and agent only change the ticket status !!",
        });
      }
      const ticket = tickets.filter((e) => e.id === ticketId);
      if (ticket.length > 0) {
        for (let i in tickets) {
          if (ticketId === tickets[i].id) {
            tickets[i].status = status;
          }
        }
        return res.json({ success: true, message: "ticket Status changed !" });
      } else {
        return res.json({ success: false, message: "ticket not found !" });
      }
    } catch (err) {
      return res.json({ success: false, message: err });
    }
  }
  static deleteTicket(req, res) {
    try {
      const { ticketId } = req.params;
      const { id, role } = req.user;
      if (checkValue(id)) {
        return res.json({ success: false, message: "token is invalid" });
      }
      if (checkValue(role)) {
        return res.json({ success: false, message: "invalid role in token" });
      }
      if (checkValue(ticketId)) {
        return res.json({ success: false, message: "invalid ticketId" });
      }
      if (role !== "admin") {
        return res.json({
          success: false,
          message: "admin only delete the ticket",
        });
      }
      const ticket = tickets.filter((e) => e.id === ticketId);
      if (ticket.length > 0) {
        for (let i in tickets) {
          if (tickets[i].id === ticketId) {
            tickets.splice(i, 1);
          }
        }
        return res.json({ success: true, message: "ticket deleted !" });
      } else {
        return res.json({ success: false, message: "ticket not found !" });
      }
    } catch (err) {
      return res.json({ success: false, message: err });
    }
  }
}
