/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});
const Mailjet = require("node-mailjet");
const functions = require("firebase-functions");

admin.initializeApp();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books");
    }
  });
});

// eslint-disable-next-line max-len
exports.capitaliseBook = onDocumentCreated("books/{bookISBN}", async (event) => {
  const book = event.data.data();

  // Capitalise the book name
  const capitalisedData = {
    name: book.name.toUpperCase(), // Capitalise the book name
    isbn: book.isbn,
  };

  // Update Firestore
  return event.data.ref.update(capitalisedData);
});

const mailjetClient = Mailjet.apiConnect(// eslint-disable-line no-unused-vars
    process.env.MAILJET_API_KEY || functions.config().mailjet.apikey,
    process.env.MAILJET_SECRET_KEY || functions.config().mailjet.secretkey,
);

exports.sendEmail = onRequest((req, res) => {
  cors(req, res, async () => {
    const {emails} = req.body;

    if (!emails) {
      return res.status(400).json({message: "No email data provided."});
    }
    const emailMessages = emails.map((email) => ({ // eslint-disable-line no-unused-vars, max-len
      From: {
        Email: process.env.SENDER_EMAIL || functions.config().mailjet.senderemail, // eslint-disable-line max-len
        Name: process.env.SENDER_NAME || functions.config().mailjet.sender,
      },
      To: [
        {
          Email: email.to,
        },
      ],
      Subject: email.subject,
      TextPart: email.body,
      Attachments: email.attachments ? email.attachment.map((attachment) => ({
        ContentType: attachment.contentType,
        Filename: attachment.name,
        Base64Content: attachment.content,
      })) : [],
    }));
    try {
      const result = await mailjetClient
          .post("send", {version: "v3.1"})
          .request({Messages: emailMessages});
      res.status(200).json({message: "Bulk emails sent successfully",
        result: result.body});
    } catch (error) {
      console.error("Error sending emails:", error);
      res.status(500)
          .json({message: "Error sending emails", error: error.message});
    }
  });
});

