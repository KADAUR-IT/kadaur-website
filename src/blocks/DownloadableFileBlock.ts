import { Block } from "payload"

export const DownloadableFileBlock : Block = 
{
    slug: "DownloadableFile",
    interfaceName: "DownloadableFileBlock",
    fields: [
        {
            name: "filename",
            type: "text",
            required: true
        },
        {
            name: "file",
            type: "upload",
            relationTo: "files",
            required: true
        }
    ]
}