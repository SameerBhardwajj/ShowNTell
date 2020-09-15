import UserNotifications
import UIKit

class NotificationService: UNNotificationServiceExtension {
    
    var contentHandler: ((UNNotificationContent) -> Void)?
    var bestAttemptContent: UNMutableNotificationContent?
    
    override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        
        self.contentHandler = contentHandler
        bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
        
        func failEarly() {
            contentHandler(request.content)
        }
        //print(request.content.userInfo)
        guard let content = bestAttemptContent else { return failEarly() }
        
        guard let aps = content.userInfo["aps"] as? [String:Any] else  { return failEarly() }
        guard let payload = aps["payload"] as? [String:Any] else { return failEarly() }
        guard let attachmentURL = payload["attachment_url"] as? String else { return failEarly() }

        guard let attachmentType = payload["content_type"] as? String else { return failEarly() }
        
        guard let imageData = NSData(contentsOf:NSURL(string: attachmentURL)! as URL) else { return failEarly() }
        
        guard let attachment = UNNotificationAttachment.create(imageFileIdentifier: attachmentType, data: imageData, options: nil) else { return failEarly() }
        
        content.attachments = [attachment]
        contentHandler(content.copy() as! UNNotificationContent)
        
    }
    
    override func serviceExtensionTimeWillExpire() {
        // Called just before the extension will be terminated by the system.
        // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
        if let contentHandler = contentHandler, let bestAttemptContent =  bestAttemptContent {
            contentHandler(bestAttemptContent)
        }
    }
}

extension UNNotificationAttachment{
    static func create(imageFileIdentifier: String, data: NSData, options: [NSObject : AnyObject]?) -> UNNotificationAttachment?{
        let fileManager = FileManager.default
        let tmpSubFolderName = ProcessInfo.processInfo.globallyUniqueString
        let fileURLPath = NSURL(fileURLWithPath: NSTemporaryDirectory())
        let tmpSubFolderURL = fileURLPath.appendingPathComponent(tmpSubFolderName, isDirectory: true)
        do {
            try fileManager.createDirectory(at: tmpSubFolderURL!, withIntermediateDirectories: true, attributes: nil)
            
            var fileURL : URL?
            
            switch imageFileIdentifier {
            case "MEDIA_VIDEO":
                fileURL = tmpSubFolderURL?.appendingPathComponent(imageFileIdentifier + ".mp4")
            
            case "MEDIA_IMAGE":
                fileURL = tmpSubFolderURL?.appendingPathComponent(imageFileIdentifier + ".png")
                
            case "MEDIA_GIF":
                fileURL = tmpSubFolderURL?.appendingPathComponent(imageFileIdentifier + ".gif")
                
            case "MEDIA_AUDIO":
                fileURL = tmpSubFolderURL?.appendingPathComponent(imageFileIdentifier + ".mp3")
                
            default:
                break
            }
            try data.write(to: fileURL!, options: [])
            let imageAttachment = try UNNotificationAttachment(identifier: imageFileIdentifier, url: fileURL!, options: options)
            return imageAttachment
            
        } catch  _ {
            //print("error \(error)")
        }
        return nil
    }
}
