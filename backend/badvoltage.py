import webapp2
import json
import datetime
import lxml.etree
import urllib2
import HTMLParser
import urllib
from google.appengine.api import memcache

h=HTMLParser.HTMLParser()

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.headers["content-type"]="text/html;charset=utf-8"
        data = memcache.get("index")
        if data is None:
            with open("index.html") as f:
                data = f.read()
                memcache.set("index",data,600)
        self.response.write(data) 

    def head(self):
        self.response.headers["content-type"]="text/html; charset=utf-8"
        self.response.write("")

class Feed(webapp2.RequestHandler):
    def get(self):  
        self.response.headers["content-type"]="application/json"
        self.response.headers["access-control-allow-origin"]="*"
        data = memcache.get('feed')
        if data is not None:
            self.response.write(data)    
        else:    
            u = urllib2.urlopen("http://www.badvoltage.org/feed/ogg/")
            r = lxml.etree.fromstring(u.read())
            items = [self.process_item(i) for i in r.xpath("//item")]
            memcache.add('feed',json.dumps(items),600)
            self.response.write(json.dumps(items))
    
    def process_item(self,i):
        elements = [
            ("title","./title"),
            ("link","./link"),
            ("description","./description"),
            ("enclosure","./enclosure/@url"),
            ]
        return dict(((x[0],self.extract_text(i.xpath(x[1])))
                    for x in elements))
    
    def extract_text(self,e):
        if hasattr(e[0],"text"):
            return h.unescape(e[0].text)
        else:
            return e[0]
        

class Manifest(webapp2.RequestHandler):
    def get(self):
        with open("manifest.webapp") as f:
            self.response.headers["content-type"]="application/x-web-app-manifest+json; charset=utf-8"
            self.response.write(f.read())

application = webapp2.WSGIApplication([
    ('/',MainPage),
    ('/manifest.webapp',Manifest),
    ('/webapp.manifest',Manifest),
    ('/feed/',Feed),
    ],
    debug=True)
        
