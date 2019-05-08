export class Contact {
    name: string;
    email: string;
    phone: number;

    constructor(name: string, email: string, phone: number) {
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}
export class Subject {
    id: number;
    name: string;
}

export class Message {
    contact: Contact;
    subject: Subject;
    text: string;

    constructor(contact: Contact, subject: Subject, text: string) {
        this.contact = contact;
        this.subject = subject;
        this.text = text;
    }
}

