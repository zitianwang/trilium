export default class EqualsExp {
    constructor(attributeType, attributeName, attributeValue) {
        this.attributeType = attributeType;
        this.attributeName = attributeName;
        this.attributeValue = attributeValue;
    }

    execute(noteSet) {
        const attrs = findAttributes(this.attributeType, this.attributeName);
        const resultNoteSet = new NoteSet();

        for (const attr of attrs) {
            const note = attr.note;

            if (noteSet.hasNoteId(note.noteId) && attr.value === this.attributeValue) {
                if (attr.isInheritable) {
                    resultNoteSet.addAll(note.subtreeNotesIncludingTemplated);
                }
                else if (note.isTemplate) {
                    resultNoteSet.addAll(note.templatedNotes);
                }
                else {
                    resultNoteSet.add(note);
                }
            }
        }
    }
}
