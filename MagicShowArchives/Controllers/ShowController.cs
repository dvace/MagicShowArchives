using MagicShowArchives.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MagicShowArchives.Controllers
{
    public class ShowController : Controller
    {
        MagicShowDBEntities db = new MagicShowDBEntities();

        public ActionResult Index()
        {
            return View();
        }

        //Get Show List
        public ActionResult GetShow()
        {
            var show = db.MagicShows.Select(x => new
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price
            }).ToList();
            return Json(show, JsonRequestBehavior.AllowGet);
        }

        // Get Show by ID
        public ActionResult GetShowId(int id)
        {
            var show = db.MagicShows.ToList().Find(x => x.Id == id);
            return Json(show, JsonRequestBehavior.AllowGet);
        }

        // POST: Show/Create
        //Create a new show
        [HttpPost]
        public ActionResult Create([Bind(Exclude = "Id")] MagicShow show)
        {
            db.MagicShows.Add(show);
            db.SaveChanges();
            return Json(show, JsonRequestBehavior.AllowGet);
        }

        // POST: Show/Edit/5
        //Edit Show
        [HttpPost]
        public ActionResult Edit(MagicShow show)
        {
            if (ModelState.IsValid)
            {
                db.Entry(show).State = EntityState.Modified;
                db.SaveChanges();
            }
            return Json(show, JsonRequestBehavior.AllowGet);
        }

        // POST: Show/Delete/5
        [HttpPost]
        public ActionResult Delete(int id)
        {
            var show = db.MagicShows.ToList().Find(x => x.Id == id);
            if (show != null)
            {
                db.MagicShows.Remove(show);
                db.SaveChanges();
            }
            return Json(show, JsonRequestBehavior.AllowGet);
        }
    }
}