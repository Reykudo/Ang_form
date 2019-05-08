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
export class Message {
    contact: Contact;
    subjectId: number;
    text: string;

    constructor(contact: Contact, subjectId: number, text: string) {
        this.contact = contact;
        this.subjectId = subjectId;
        this.text = text;
    }
}

export class Subject {
    id: number;
    name: string;
}